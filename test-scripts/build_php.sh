#!/bin/bash

if [ ! $# == 2 ]; then
    echo "Должно быть указано два параметра: номер билда и ветка"
    exit 1
fi

BUILD=$1
BRANCH=$2

echo "Начинаем сборку пакета ${BUILD}"
sleep 5
vmstat 2 5
echo "Продолжаем сборку пакета"
sleep 10
vmstat 2 10
echo "Сборка пакета закончилась"
