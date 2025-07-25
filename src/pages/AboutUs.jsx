const AboutUs = () => {
  const developer = {
    name: "Toimur Hasan",
    bio: `I'm a passionate full-stack web developer who loves solving real-world problems 
    through clean and efficient code. I enjoy teaching, building products, and helping 
    others grow in tech.`,
    projectsCount: 3,
    profileImage: "https://avatars.githubusercontent.com/u/87655746?v=4", // Optional
    links: [
      {
        title: "GitHub",
        url: "https://github.com/toimurhasan",
      },
      {
        title: "Portfolio Website",
        url: "https://toimur-hasan.web.app",
      },
      {
        title: "Facebook",
        url: "https://web.facebook.com/web.developer.tamim",
      },
    ],
  };

  return (
    <div className="px-4 md:px-10 py-12 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">About the Developer</h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <img
          src={developer.profileImage}
          alt={developer.name}
          className="w-36 h-36 rounded-full object-cover border"
        />

        {/* Bio and Info */}
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-2xl font-semibold">{developer.name}</h3>
          <p className="">{developer.bio}</p>
          <p className="font-medium">Projects Built: {developer.projectsCount}</p>

          <div className="flex gap-2 ">
            <h3 className="font-semibold">Projects Links:</h3>
            <a className="link" target="_blank" href="https://hobbyhub-tamim.web.app/">
              HobbyHub
            </a>
            <a className="link" target="_blank" href="https://peersolve.web.app/">
              PeerSolve
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {developer.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
