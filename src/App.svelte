<script lang="ts">
	let name: string = 'world';

	import ThresholdKey from "@tkey/default";
	import TorusServiceProvider from "@tkey/service-provider-torus";
	import TorusStorageLayer from "@tkey/storage-layer-torus";

	import WebStorageModule, { WEB_STORAGE_MODULE_NAME } from "@tkey/web-storage";


	async function doTorus () {
		const serviceProvider = new TorusServiceProvider({
			directParams: {
				baseUrl: document.location.protocol + "//" + document.location.host,
				network: "testnet", // or mainnet
				proxyContractAddress: "0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183", // corresponding proxy contract address of the specified network
			},
		});

		const storageLayer = new TorusStorageLayer({ hostUrl: "https://metadata.tor.us", serviceProvider });
		const tkey = new ThresholdKey({
			modules: {
				// More modules can be passed to create additional shares.
				[WEB_STORAGE_MODULE_NAME]: new WebStorageModule(),
			},
			serviceProvider,
			storageLayer,
		});

		await tkey.serviceProvider.init({
			baseUrl: document.location.protocol + "//" + document.location.host,
			network: "testnet",
			redirectPathName: "redirect.html",
			uxMode: "popup"
		})
		await tkey.serviceProvider.triggerLogin({
			typeOfLogin: "google",
			verifier: "circles-google-testnet",
			clientId: "906916064114-5m4nsuvu0uhs2gnav4me4rsdrnlf445k.apps.googleusercontent.com"
		});
		await tkey.initialize({});
		const key = await tkey.reconstructKey();

		console.log(key);
	}
</script>

<main>
	<button	on:click={doTorus}></button>
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		h1 {
			color: #ff3e00;
			text-transform: uppercase;
			font-size: 4em;
			font-weight: 100;
		}

		@media (min-width: 640px) {
			max-width: none;
		}
	}
</style>
