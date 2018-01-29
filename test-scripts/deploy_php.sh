#!/bin/bash

if [ ! $# == 2 ]; then
    echo "Должно быть указано два параметра: номер билда и хост"
    exit 1
fi

BUILD=$1
HOST=$2

echo "Начинаем Depoy пакета ${BUILD} на хост ${HOST}"
vmstat 3 20
echo "Сборка пакета закончилась"
