import Typography from "@material-ui/core/Typography";

function AboutUsScreen() {
  return (
    <div>
      <Typography
        color="primary"
        style={{ color: "DarkGreen", fontSize: "26pt", fontWeight: "bolder" }}
      >
        Our Story
      </Typography>
      <img
        alt="aboutUs Screen"
        src="https://littleprinceplants.com/wp-content/uploads/2020/10/Pachyphytum-glutinicaule-Sticky-Moonstones-Succulent-October3-e1603146702838-510x510.jpg"
      ></img>

      <p>
        The plants shop was founded on this simple premise—plants make us
        happier, healthier humans. I started The plants shop in 2012 at the age
        of 26 in borrowed office space in a tiny walk-up in New York City’s
        Chinatown. The idea had sprouted years before (sorry, we love a good
        plant pun around here) when I found myself in my first adult apartment.
        Bleak is how you’d describe it. Homesick is how you’d describe me. My
        Mom, an immigrant who stayed connected to her Filipino roots through
        gardening, recommended I get some houseplants. Little did I know tapping
        into my family’s generational love of plants would grow into the small
        but mighty company that is The plants shop.
      </p>
      <p>
        I instantly became passionate about plants, and keenly aware of the
        impact being around plants had on me growing up. There’s something in
        the simple act of being around and caring for plants that improves our
        mood, and, added bonus, beautifies the spaces we live and work in. It’s
        been shown every exposure to nature—from indoor gardening to forest
        bathing—mitigates the modern condition, that stressed-out state we find
        ourselves in all too often. That (plus a lot of dirt, sweat, and hustle)
        is how The plants shop came to be. So I invite you to join me—whether
        you’ve never had a plant before or are adding to a budding collection—in
        cultivating a space, and a life, with plants. I know firsthand how
        wonderful it can be.
      </p>
    </div>
  );
}

export default AboutUsScreen;
