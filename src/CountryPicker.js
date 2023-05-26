import van from "https://vanjs.org/code/van-0.11.10.min.js";
const { input, button, div } = van.tags;

const CountryPicker = ({ oncountry }) => {
  const country = van.state("Mexico");
  return div(
    input({
      type: "text",
      value: country,
      oninput: (ev) => (country.val = ev.target.value),
    }),
    button(
      {
        onclick: () => {
          oncountry(country.val);
        },
      },
      "Add country"
    )
  );
};

export default CountryPicker;
