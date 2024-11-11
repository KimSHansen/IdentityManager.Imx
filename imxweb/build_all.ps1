# Create a list of commands
$commands = @(
    "npm run build qbm",
    "npm run build qer",
    "npm run build:dynamic tsb",
    "npm run build:dynamic att",
    "npm run build:dynamic rms",
    "npm run build:dynamic aad",
    "npm run build:dynamic aob",
    "npm run build:dynamic uci",
    "npm run build:dynamic cpl",
    "npm run build:dynamic dpr",
    "npm run build:dynamic rmb",
    "npm run build:dynamic rps",
    "npm run build:dynamic o3t",
    "npm run build:dynamic olg",
    "npm run build:dynamic hds",
    "npm run build:dynamic pol",
    "npm run build:dynamic apc",
    "npm run build:dynamic sac",
    "npm run build:app qer-app-portal",
    "npm run build:app qbm-app-landingpage"
)

# Loop through each command and run it
foreach ($command in $commands) {
    Write-Host "Running: $command"
    Invoke-Expression $command
}
