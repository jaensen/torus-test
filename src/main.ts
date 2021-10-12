import App from './App.svelte';
import DirectWebSDK from "@toruslabs/torus-direct-web-sdk";

declare global {
	interface Window {
		customauth: DirectWebSDK
	}
}
const app = new App({
	target: document.body
});

export default app;
