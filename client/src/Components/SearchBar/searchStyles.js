import { container } from "../../assets/jss/material-kit-react.js";

import image from "../../assets/img/sign.jpg";

const loginStyle = {
  section: {
    minHeight: "110vh",
    maxHeight: "1600px",
    overflow: "hidden",
    padding: "70px 200px 0 0",
    backgroundPosition: "top center",
    backgroundSize: "cover",
    margin: "0",
    border: "0",
    display: "flex",
    alignItems: "center",
    backgroundImage: "url(" + image + ")",
  },
  container,
  form: {
    margin: "0",
    marginLeft: "15px",
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px",
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center",
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important",
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0",
  },
  inputIconsColor: {
    color: "#495057",
  },
  selectTimer: {
    paddingLeft: "5rem",
    paddingRight: "5rem",
  },
  inputLabel: {
    paddingLeft: "7rem",
    paddingRight: "7rem",
  },
  trends: {
    paddingBottom: "3rem",
    paddingTop: "1rem",
    paddingRight: "3rem",
  },
  appbar: {
    width: "200%",
    marginLeft: "-1rem",
  },
  noti: {
    width: "200%",
    marginTop: "-8rem",
    marginBottom: "2rem",
    marginRight: "2rem",
    marginLeft: "-2rem",
  },
  wrapper: {
    marginRight: "2rem",
  },
};

export default loginStyle;
