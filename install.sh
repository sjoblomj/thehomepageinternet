#!/bin/bash

if ! command -v git --version &> /dev/null
then
    echo "git does not seem to be installed"
    exit 1
fi
if ! command -v pre-commit --version &> /dev/null
then
    echo "pre-commit does not seem to be installed"
    exit 1
fi

