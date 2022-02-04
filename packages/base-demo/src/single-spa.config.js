import * as singleSpa from 'single-spa/lib/umd/single-spa.dev'; //导入single-spa
import axios from 'axios';
/*
 * runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
 **/
const runScript = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = url;
    script.onload = () => {
      resolve(url);
    };
    script.onerror = reject;
    // const firstScript = document.getElementsByTagName('script')[0];
    // console.log(firstScript.parentNode,'firstScript.parentNode.');
    // firstScript.parentNode.insertBefore(script, firstScript);
    const firstScript = document.body.getElementsByTagName('script')[0];
    document.body.insertBefore(script,firstScript);
  });
};

/*
 * getManifest：远程加载manifest.json 文件，解析需要加载的js
 * url: manifest.json 链接
 * bundle：entry名称
 * */
const getManifest = (url, bundle) =>
  new Promise((resolve) => {
    axios.get(url).then( async (res) => {
      const { data } = res || {};
      const { entrypoints, publicPath } = data;
      const assets = entrypoints[bundle].assets;
      for (let i = 0; i < assets.length; i++) {
        await runScript(publicPath + assets[i]).then(() => {
          if (i === assets.length - 1) {
            resolve();
          }
        });
      }
    });
  });

singleSpa.registerApplication(
  //注册微前端服务
  'slaveVue',
  async () => {
    await getManifest(
      '//127.0.0.1:9989/asset-stats.json',
      'app'
    );
    return window.slaveVue;
  },
  (location) => location.pathname.startsWith('/vue'), // 配置微前端模块前缀
  {
    components: {},
    parcels: {},
  }
);
singleSpa.registerApplication(
  //注册微前端服务
  'react-demo',
  async () => {
    return await getManifest('/react/mainfest.json', 'app');
  },
  (location) => {
    // addShadowDom();
    return location.pathname.startsWith('/react');
  }, // 配置微前端模块前缀
  {}
);

singleSpa.start(); // 启动

window.addEventListener('single-spa:before-routing-event', () => {
  console.log('before-routing-event');
});
window.addEventListener('single-spa:app-change', () => {
});
