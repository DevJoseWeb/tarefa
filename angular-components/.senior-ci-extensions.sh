#!/bin/bash

update_library_package() {
    LIB_DEPS=$(node -pe "JSON.stringify(require('./package.json').dependencies)");
    DEST_FILE="lib/package.json";

    sed -i "s|{version}|$1|" $DEST_FILE
    sed -i "s|{}|$LIB_DEPS|" $DEST_FILE
}

before_packaging() {
    LIB_VERSION=$(node -pe "require('./package.json').version");
    update_library_package $LIB_VERSION
}

before_release_snapshot() {
    LIB_VERSION=$(node -pe "require('./package.json').version")-$(uuidgen);
    update_library_package $LIB_VERSION
}