#!/bin/bash

# stop servers
forever stop pageServer.js
forever stop iobio/services/bamBinnerServer.js
forever stop iobio/services/bamtoolsServer.js
forever stop iobio/services/vcflibServer.js
forever stop iobio/services/tabixServer.js
forever stop iobio/services/samtoolsVcfServer.js
forever stop iobio/services/freebayesServer.js
forever stop iobio/services/bcftoolsServer.js