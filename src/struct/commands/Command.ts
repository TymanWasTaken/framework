import { ApplicationCommandOption, PermissionStrings } from "../../../deps.ts";
import {
  ConvertedOptions,
  NaticoCommandHandler,
  NaticoModule,
} from "../../mod.ts";
export class NaticoCommand extends NaticoModule {
  declare handler: NaticoCommandHandler;
  id: string;
  category: string | undefined;
  aliases: string[] | undefined;
  name: string;
  examples: string[] | undefined;
  ownerOnly: boolean | undefined;
  required: boolean | undefined;
  description: string | undefined;
  slash: boolean | undefined;
  enabled: boolean | undefined;
  superUserOnly: boolean | undefined;
  options?: ApplicationCommandOption[];
  permissions: PermissionStrings[] | undefined;

  constructor(
    id: string,
    {
      name,
      aliases,
      examples,
      description,
      enabled = true,
      slash,
      required,
      category,
      ownerOnly,
      superUserOnly,
      options,
      permissions,
    }: {
      options?: ApplicationCommandOption[];

      name?: string;
      aliases?: string[];
      examples?: string[];
      description?: string;
      enabled?: boolean;
      slash?: boolean;
      required?: boolean;
      category?: string;
      ownerOnly?: boolean;
      superUserOnly?: boolean;
      permissions?: PermissionStrings[];
    },
  ) {
    super(id);
    this.options = options;
    this.superUserOnly = superUserOnly;
    this.enabled = enabled;
    this.slash = slash;
    this.description = description;
    this.required = required;
    this.ownerOnly = ownerOnly;
    this.name = name?.toLowerCase() || id.toLowerCase();
    this.examples = examples || [`${name}`];
    this.permissions = permissions;

    this.id = id;

    this.aliases = Array.from(
      new Set([
        ...aliases!.map((name: string) => name.toLowerCase()),
        id.toLowerCase(),
        name!.toLowerCase(),
      ]),
    );

    this.category = category || "general";
  }
  exec(_message: Message, _options: ConvertedOptions) {
    throw new Error(`NOT_CREATED ${this.id}`);
  }
}
