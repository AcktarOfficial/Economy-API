import { resolve } from "node:path";

import { Plugin, PluginType } from "@serenityjs/plugins";
import { Player, PlayerJoinSignal, WorldEvent } from "@serenityjs/core";

import { EconomyCommands } from "./commands";

class EconomyAPI extends Plugin {
	public readonly type = PluginType.Api;

	public constructor() {
		super("EconomyAPI", "1.0.0");
	}

	public onInitialize(): void {
		// Register the commands.
		this.serenity.on(WorldEvent.WorldInitialize, ({ world }) => {
			// Register the economy commands
			for (const register of EconomyCommands) register(world, this);
		});

		// Hook the world events.
	//	this.serenity.on(WorldEvent.PlayerJoin, this.onPlayerJoined.bind(this));
	}

	public onStartUp(): void {
		// Log that the economy plugin has started.
		this.logger.info("Plugin has started successfully.");
	}

	public onShutDown(): void {
		// Log that the economy plugin has stopped.
		this.logger.info("Plugin has stopped successfully.");
	}

}

export { EconomyAPI };

export default new EconomyAPI();
