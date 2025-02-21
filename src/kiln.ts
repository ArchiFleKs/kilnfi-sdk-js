import api from './api';
import { KILN_VALIDATORS as v } from "./validators";
import { EthService } from './services/eth';
import { SolService } from './services/sol';
import { AtomService } from './services/atom';
import { AccountService } from './services/accounts';
import { AdaService } from './services/ada';
import { NearService } from './services/near';
import { DotService } from './services/dot';
import { XtzService } from './services/xtz';
import { MaticService } from './services/matic';
import { OsmoService } from './services/osmo';
import { FireblocksService } from "./services/fireblocks";
import { DydxService } from "./services/dydx";

type Config = {
  apiToken: string;
  testnet?: boolean;
  baseUrl?: string;
};

export const KILN_VALIDATORS = v;

export class Kiln {
  fireblocks: FireblocksService;
  accounts: AccountService;
  eth: EthService;
  sol: SolService;
  atom: AtomService;
  ada: AdaService;
  near: NearService;
  dot: DotService;
  xtz: XtzService;
  matic: MaticService;
  osmo: OsmoService;
  dydx: DydxService;

  constructor({ testnet, apiToken, baseUrl }: Config) {
    api.defaults.headers.common.Authorization = `Bearer ${apiToken}`;
    api.defaults.headers.common['Content-Type'] = 'application/json';
    api.defaults.baseURL = baseUrl ? baseUrl :
      testnet === true
        ? 'https://api.testnet.kiln.fi'
        : 'https://api.kiln.fi';

    this.fireblocks = new FireblocksService({ testnet });
    this.accounts = new AccountService({ testnet });
    this.eth = new EthService({ testnet });
    this.sol = new SolService({ testnet });
    this.atom = new AtomService({ testnet });
    this.ada = new AdaService({ testnet });
    this.near = new NearService({ testnet });
    this.dot = new DotService({ testnet });
    this.xtz = new XtzService({ testnet });
    this.matic = new MaticService({ testnet });
    this.osmo = new OsmoService({ testnet });
    this.dydx = new DydxService({ testnet });
  }
}