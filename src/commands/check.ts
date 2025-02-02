import { Entity, Player, TargetEnum, World } from "@serenityjs/core";
import { EconomyAPI } from "..";

function register(world: World, plugin: EconomyAPI) {
  // Register the stop command
  world.commands.register(
    "check",
    "DEBUG CHECK USER IN DATABASE",
    (registry) => {
      // Set the command to be an operator command
    },
    () => {
      
      // Return a message
      return {
        message: "CHECK COMMAND HAS BEEN EXECUTED"
      };
    }
  );
};

export default register;
