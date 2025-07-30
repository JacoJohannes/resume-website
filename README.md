# Resume Website

This repository contains a minimalist, modern resume website designed with HTML, CSS and a small amount of JavaScript.  The site features sections for **About**, **Skills**, **Projects**, **Experience**, **Education** and **Contact**.  It's been built with a responsive layout so it looks great on both desktop and mobile devices.  You can use this template as a starting point and customize it to reflect your own background, projects and design preferences.

## Getting Started

1. **Clone or download this repository** to your local machine.

2. Replace all placeholder text (e.g. `Your Name`, `Your Profession`, project descriptions) with your own content.  You can also swap out the profile image located at `images/profile.png` with your own photo.  Be sure to update the `href` attributes for project buttons to link to your GitHub repositories or live demos.

3. Commit and push the changes to your own GitHub repository.  If you're using GitHub Desktop or the command line, the basic workflow looks like this:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

4. **Enable GitHub Pages** in your repository settings:

   - Navigate to **Settings** → **Pages**.
   - Under **Source**, choose the `main` branch (and optionally the `/root` folder) then click **Save**.
   - GitHub will build and serve your site at `https://yourusername.github.io/your-repo`.  The first build can take a couple of minutes.

5. If you have purchased a **custom domain**, follow GitHub's instructions to add a `CNAME` file (or configure DNS records) so your domain points to your GitHub Pages site.  You'll find the relevant settings under **Settings** → **Pages** → **Custom domain**.

## Customizing Styles

All style rules are contained in `style.css`.  You can change the color palette, fonts, spacing and more.  The navigation is fully responsive—on small screens a hamburger menu appears.  If you wish to remove or modify any section, simply edit the corresponding HTML markup in `index.html`.

## License

This project is provided for personal use.  Feel free to reuse and adapt it for your own portfolio or resume site.