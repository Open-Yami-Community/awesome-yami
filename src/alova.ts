import { createAlova } from "alova";
import adapterFetch from "alova/fetch";

const alovaInstance = createAlova({
	requestAdapter: adapterFetch(),
	responded: response => response.json(),
});
export default alovaInstance;
