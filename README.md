# dasrick.github.io

This is the source part of the jekyll site

## Git and deployment

There is a simple script that is taken from [rocco.github.io](https://github.com/rocco/rocco.github.io/tree/source).
It is called `.jk-deploy` resides in root folder and requires a certain Git setup:

I don't use GitHub's Jekyll as is does not support custom plugins.
So the whole project resides in the `source` branch of my [rocco.github.io repo](https://github.com/rocco/rocco.github.io).
This way I can put the generated site into my `master` branch and keep it clean.

My deploy script grabs everything Jekyll generated into `/_site` and puts it into `/_deploy`.
This folder is ignored by the surrounding Git repo and contains its own one.
So I can keep the `/_deploy` folder on `master` and add, commit and force push to GitHub to deploy my website.

## Workflow

Follow these steps:

- edit/add files
- `$ jekyll build` to generate page
- `$ jekyll serve --watch` to inspect locally on [`http://localhost:4000/`](http://localhost:4000/)
- ./.jk-deploy to push website to GitHub