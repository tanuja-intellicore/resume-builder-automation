module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "features/**/*.feature",
        ],
        dryRun: false,
        require: [
            "test/step-definitions/*.ts",
            "test/step-implementaions/*.ts",
            "test/helper/*.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:cucumber-report/cucumber-report.html",
            "json:cucumber-report/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 1
    }
}