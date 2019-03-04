### Caliper Work flow

#### The process begin at the main.js file
It passes the blockchain-config file and the benchmark-config file to the run method of benchflow.js that maintains all the activities that caliper performs.

#### In the benchflow.js File the run method is invoked
We begin by resolving the file paths i,e get their absolute paths if relative path were given earlier
```
absConfigFile  = Util.resolvePath(configFile);
absNetworkFile = Util.resolvePath(networkFile);
```

#### Next we create three objects
```
blockchain = new Blockchain(absNetworkFile);
monitor = new Monitor(absConfigFile);
client  = new Client(absConfigFile);
```
1. A blockchain object from the network configuration. If the network configuration if for fabric, an object of the fabric adapter class is created. The blockchain object thus created holds the address of the network configuration file.
```
constructor(config_path) {
    super(config_path);
}
// The super class is blockchain-interface
  constructor(configPath) {
      this.configPath = configPath;
  }
```


2. A monitor object is created with the benchmark configuration. In addition an empty set of attributes- the status of the monitor, an array of peers and an array of monitors are also initialized.
```
constructor(configPath) {
    this.configPath = configPath;
    this.started = false;
    this.peers = [];
    this.monitors = [];
}
```


3. A client object is created with the benchmark configuration. It parses the config file to get the type of clients and their count. Other attributes include- an array of results and an object called updates.
```
constructor(config) {
    let conf = util.parseYaml(config);
    this.config = conf.test.clients;
    this.results = [];                        // output of recent test round
    this.updates = {id:0, data:[]};           // contains txUpdated messages
}
```
