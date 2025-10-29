import nats, { Stan } from "node-nats-streaming";
import colors from "colors";
import { randomBytes } from "crypto"

class NatsWrapper {
    private _client?: Stan; 

    get client() {
        if(!this._client) {
            throw new Error("Cannot Access NATS Client Before Connecting")
        }

        return this._client;
    }

    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise<void>((resolve, reject) => {
            this.client.on("connect", () => {
                console.log(colors.green(`Publisher connected to NATS on port: ${colors.magenta.bold("4222")}`))
                resolve();
            })

            this.client.on("error", (err) => {
                console.log(colors.red(`Error while Connecting to NATS: ${colors.red.bold(err)}`))
                reject(err);
            })
        })
    }
}

export const connectNats = async () => {
    await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID, 
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL, 
        // "ticketing",
        // randomBytes(4).toString("hex"),
        // "http://nats-srv:4222"
    );

    natsWrapper.client.on("close", () => {
        console.log(colors.red.bold("NATS connection closed!"));
        process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
};


export const natsWrapper = new NatsWrapper(); 