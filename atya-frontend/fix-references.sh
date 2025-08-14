#!/bin/bash

# Fix HTML file references
find static -name "*.html" -type f -exec sed -i '' 's/href="static\//href="/g' {} \;
find static -name "*.html" -type f -exec sed -i '' 's/src="static\/js\//src="js\//g' {} \;

# Fix JS file references
find static/js -name "*.js" -type f -exec sed -i '' 's/from "\.\.\/static\/js\//from "\.\.\/js\//g' {} \;
find static/js -name "*.js" -type f -exec sed -i '' 's/from "\.\.\/static\/js\//from "\.\.\/js\//g' {} \;

# Fix any remaining absolute paths
find static -type f -exec sed -i '' 's|/static/|/|g' {} \;

# Make the script executable
chmod +x fix-references.sh
