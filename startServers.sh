#!/bin/bash

# start application server
forever start pageServer.js --port 8070

# start bam binner service
forever start iobio/services/bamBinnerServer.js --port 8020

# start bamtools server
forever start iobio/services/bamtoolsServer.js --port 8030

# start vcflib server
forever start iobio/services/vcflibServer.js --port 7080

# start tabix server to download vcf slices
forever start iobio/services/tabixServer.js --port 7090

# start samtools server
forever start iobio/services/samtoolsVcfServer.js --port 8060

# start bcftoolsServer
forever start iobio/services/bcftoolsServer.js --port 8040

# start freebayes server
forever start iobio/services/freebayesServer.js --port 8080