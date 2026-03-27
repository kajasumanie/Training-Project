import prodConfig from "./prodConfig";
import devConfig from "./devConfig";
import AppConfig from "./AppConfig";

const index: AppConfig = import.meta.env.MODE === 'development' ? devConfig : prodConfig;
console.log('AppConfig', 'mode', import.meta.env.MODE);
console.log('AppConfig', `config.env:`, index.env);
console.log('AppConfig', `config.baseUrl:`, index.baseUrl);

export default index;

