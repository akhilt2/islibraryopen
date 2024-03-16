#!/bin/bash

# Check if argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <server_address>"
    exit 1
fi

SERVER_ADDRESS="$1"

# Function to toggle store state
toggle_state() {
    current_state=$(curl -s "$SERVER_ADDRESS/live" | jq -r '.isOpen')
    new_state=$(( !current_state ))
    curl -X PUT -H "Content-Type: application/json" -d "{\"isOpen\":$new_state}" "$SERVER_ADDRESS/live"
    echo "Store state toggled. New state: $new_state"
}

toggle_state

