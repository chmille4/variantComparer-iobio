#!/bin/bash

# start application server
forever start pageServer.js --port 8070

# start bam binner service
forever start minion/services/bamBinnerServer.js --port 8020

# start bamtools server
forever start minion/services/bamtoolsServer.js --port 8030

# start vcflib server
forever start minion/services/vcflibServer.js --port 7080

# start tabix server to download vcf slices
forever start minion/services/tabixServer.js --port 7090

# start samtools server
forever start minion/services/samtoolsVcfServer.js --port 8060

# start bcftoolsServer
forever start minion/services/bcftoolsServer.js --port 8040

# start freebayes server
forever start minion/services/freebayesServer.js --port 8080