#!/bin/bash

# stop servers
forever stop pageServer.js
forever stop minion/services/bamBinnerServer.js
forever stop minion/services/bamtoolsServer.js
forever stop minion/services/vcflibServer.js
forever stop minion/services/tabixServer.js
forever stop minion/services/samtoolsVcfServer.js
forever stop minion/services/freebayesServer.js
forever stop minion/services/bcftoolsServer.js