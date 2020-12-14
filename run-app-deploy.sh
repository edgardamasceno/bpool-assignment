#!/bin/bash
if [ $1 == "--dev" ]; then
    echo "Iniciando ambiente de desenvolvimento..."
    echo "Desconstruindo containers, caso existam..."
    docker-compose -f docker-compose.dev.yml down
    echo "Construindo containers de desenvolvimento..."
    docker-compose -p bpool_dev -f docker-compose.dev.yml up --build --force-recreate --always-recreate-deps
fi

# if [ $1 == "--prod" ]; then
#     echo "Fazendo deploy em ambiente de Produção"
#     echo "Desconstruindo containers, caso existam..."
#     docker-compose -f docker-compose.prod.yml down
#     echo "Construindo containers de desenvolvimento"
#     docker-compose -p bpool -f docker-compose.prod.yml up -d --build
# fi
