# Contributing to SecondCycle

This guide will provide all the necessary information to get started.

## Workflow

### Branching

- **Creating a Branch:** Always branch off from the `develop` branch for new features or fixes.
  - Naming convention: Use `feature/<feature-name>` for new features and `bug/<bug-name>` for bug fixes.
- **Syncing:** Regularly sync your branch with `develop` to stay updated with the latest changes and avoid merge conflicts. (You can use `git pull origin develop`)

### Making Changes

- **Commits:** Write clear, concise commit messages that explain the "what" and "why" of your changes.
- **Testing:** Before submitting your changes, ensure the change is not breaking existing features and it is properly working.

### Pull Requests

- **Creating a Pull Request:** When you're ready, open a pull request against the `develop` branch.
- **Description:** In the PR description, clearly state the purpose of your changes and link to related issues.
- **Review:** Request a review from at least one team member and address any feedback before merging.
- **On Merging a Pull Request:** Please use `squash and merge` when merging an approved Pull Request. This will help us keep the log history clean and concise.

## Code Standards

- **Formatting:** Ensure Prettier and ESLint are properly set up in your development environment for consistent code formatting and linting.
- **Documentation:** Comment your code where necessary and update any related documentation.

## Need Help?

- **Communication:** If you're stuck, don't hesitate to ask for help. Use our Discord server, or the GitHub issue tracker to seek assistance.

## Resources

- **Learning Git:** Familiarize yourself with our workflow by completing these tutorials:
  - [Git branching tutorial](https://learngitbranching.js.org/)
  - [Git workflow tutorial](https://learngitbranching.js.org/)
- **Code Style:** Learn how to set up Prettier and ESLint with this guide:
  - [How to use Prettier with ESLint](https://www.robinwieruch.de/prettier-eslint/)
