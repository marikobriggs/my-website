// function adjustSidebarHeight() {
//     const header = document.querySelector("header");
//     const footer = document.querySelector("footer");
//     const sidebar = document.querySelector(".sidebar");

//     if (header && footer && sidebar) {
//         const headerHeight = header.offsetHeight;
//         const footerHeight = footer.offsetHeight;
//         const viewportHeight = window.innerHeight;

//         // Adjust sidebar height dynamically
//         sidebar.style.height = `${viewportHeight - headerHeight - footerHeight}px`;
//         sidebar.style.top = `${headerHeight}px`; // Ensure it starts right after the header
//         sidebar.style.bottom = `${footerHeight}`;
//     }
// }

// // Adjust on page load
// window.addEventListener("load", adjustSidebarHeight);

// // Adjust on window resize
// window.addEventListener("resize", adjustSidebarHeight);