# For each internal link in markdown files under src/, check if the relevant page exists

grep -rhoiE '\]\((\/[a-zA-Z0-9/_\-\.#?=]+)\)' src | \
  sed -E 's/.*\]\((\/[a-zA-Z0-9/_\-\.#?=]+)\).*/\1/' | \
  sort | uniq | while read -r link; do
    # Remove anchor or query if present
    path="${link%%[\?#]*}"
    # Remove trailing slash for file checks, but save original
    clean_path="${path%/}"
    found="no"

    # Check for exact file under docs/
    if [ -e "docs$path" ] || [ -e "docs$clean_path" ]; then
      found="yes"
    # Check for index.html or README.md (.md) in directory
    elif [ -d "docs$path" ] && { [ -e "docs$path/index.html" ] || [ -e "docs$path/README.md" ]; }; then
      found="yes"
    elif [ -d "docs$clean_path" ] && { [ -e "docs$clean_path/index.html" ] || [ -e "docs$clean_path/README.md" ]; }; then
      found="yes"
    # Check for .html or .md file matching the path
    elif [ -e "docs$path.html" ] || [ -e "docs$path.md" ] || [ -e "docs$clean_path.html" ] || [ -e "docs$clean_path.md" ]; then
      found="yes"
    fi

    if [ "$found" = "no" ]; then
      echo "Missing: $link"
    fi
  done > logs.txt

