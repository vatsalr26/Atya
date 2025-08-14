#!/bin/bash

# Update HTML file references
find static -name "*.html" -type f -exec sed -i '' 's/href="\([^"]*\.html\)"/href="static\/\1"/g' {} \;
find static -name "*.html" -type f -exec sed -i '' 's/src="js\//src="static\/js\//g' {} \;

# Update JS file references
find static/js -name "*.js" -type f -exec sed -i '' 's/from '"'"'\.\.\/js\//from '"'"'\.\.\/static\/js\//g' {} \;
find static/js -name "*.js" -type f -exec sed -i '' 's/from "\.\.\/js\//from "\.\.\/static\/js\//g' {} \;

# Update CSS references
find static -name "*.html" -type f -exec sed -i '' 's/href="css\//href="static\/css\//g' {} \;

# Update any image references
find static -name "*.html" -type f -exec sed -i '' 's/src="images\//src="static\/images\//g' {} \;

# Make the script executable
chmod +x update-references.sh
