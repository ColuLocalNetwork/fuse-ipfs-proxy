# Configuration

See [LOCAL.js](https://github.com/ColuLocalNetwork/fuse-ipfs-proxy/blob/master/config/LOCAL.js) for an example of a configuration file.

See [osseus-config](https://github.com/colucom/osseus-config) for detailed explanation on how to set/use the configuration.

#### non-osseus config variables
|       Key       	| Mandatory 	|  Type  	|                 Description                 	| Default 	|
|:---------------:	|:---------:	|:------:	|:-------------------------------------------:	|:-------:	|
|   `IPFS_HOST`   	|     v     	| String 	|                IPFS node host               	|         	|
|   `IPFS_PORT`   	|     v     	| String 	|                IPFS node port               	|         	|
| `IPFS_PROTOCOL` 	|     v     	| String 	|              IPFS node protocol             	|         	|
|  `IPFS_TIMEOUT` 	|     x     	| Number 	| Milliseconds to wait for response from IPFS 	|   5000  	|