#!/usr/bin/env sh

POSITIONAL_ARGS=()

while [[ $# -gt 0 ]]; do
  case $1 in
    -m|--manager)
      PACKAGE_MANAGER="$2"
      shift
      shift 
      ;;
    -e|--env)
      ENV_FILE="$2"
      shift
      shift
      ;;
    -*|--*)
      echo "Unknown option $1"
      exit 1
      ;;
    *)
      POSITIONAL_ARGS+=("$1") # save positional arg
      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL_ARGS[@]}" # restore positional parameters

./scripts/build.sh $PACKAGE_MANAGER
./scripts/compress.sh
./scripts/upload.sh $ENV
