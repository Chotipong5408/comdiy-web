import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const ProfileStatistics = () => {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#f4f6f9" }}
    >
      <MDBContainer className="container py-5 flex-grow-1">
        <MDBRow className="justify-content-center align-items-center">
          {/* การ์ดที่ 1 */}
          <MDBCol md="4" xl="3" className="mb-4">
            <MDBCard
              style={{
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                height: "500px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="hover-shadow-lg"
            >
              <MDBCardBody className="text-center d-flex flex-column justify-content-center align-items-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage
                    src="https://img2.pic.in.th/pic/IMG_09041794fdeef7acf17b.jpg"
                    className="rounded-circle"
                    fluid
                    style={{
                      width: "200px",
                      height: "200px",
                      border: "2px solid #ddd",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
                <MDBTypography tag="h5" className="font-weight-bold text-dark">
                  Mr.Chotipong Kaewpuang
                </MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  @Developer <span className="mx-2">|</span>{" "}
                  <a href="/" className="text-primary">
                    comdiy.com
                  </a>
                </MDBCardText>
                <br />
                <br />
                <div className="mb-4 pb-2 d-flex justify-content-center">
                  <Link
                    to="https://www.facebook.com/chotipong.kaewpuang.2024 "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-facebook mx-2"
                      style={{ fontSize: "24px", color: "#3b5998" }}
                    ></i>
                  </Link>
                  <Link
                    to="https://line.me/ti/p/bQxwN8Frwe "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-line mx-2"
                      style={{ fontSize: "24px", color: "#00c300" }}
                    ></i>
                  </Link>
                  <Link
                    to="https://www.instagram.com/rr_riww/?__pwa=1 "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-instagram mx-2"
                      style={{
                        fontSize: "24px",
                        background:
                          "linear-gradient(to right, #e1306c, #fd1d1d, #fcb045, #833ab4)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    ></i>
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* การ์ดที่ 2 */}
          <MDBCol md="4" xl="3" className="mb-4">
            <MDBCard
              style={{
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                height: "500px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="hover-shadow-lg"
            >
              <MDBCardBody className="text-center d-flex flex-column justify-content-center align-items-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage
                    src="https://img2.pic.in.th/pic/S__26820621.jpg"
                    className="rounded-circle"
                    fluid
                    style={{
                      width: "200px",
                      height: "200px",
                      border: "2px solid #ddd",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
                <MDBTypography tag="h5" className="font-weight-bold text-dark">
                  Ms.Kantana Songparkon
                </MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  @Admin <span className="mx-2">|</span>{" "}
                  <a href="/" className="text-primary">
                    comdiy.com
                  </a>
                </MDBCardText>
                <br />
                <br />
                <div className="mb-4 pb-2 d-flex justify-content-center">
                  <Link
                    to="https://www.facebook.com/share/1Cs7NqET6A/?mibextid=wwXIfr "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-facebook mx-2"
                      style={{ fontSize: "24px", color: "#3b5998" }}
                    ></i>
                  </Link>
                  <Link
                    to="https://line.me/ti/p/4GhqHYSId_ "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-line mx-2"
                      style={{ fontSize: "24px", color: "#00c300" }}
                    ></i>
                  </Link>
                  <Link
                    to="https://www.instagram.com/fern259_?igsh=MTF5ODZwc3l2bDdudA%3D%3D&utm_source=qr "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-instagram mx-2"
                      style={{
                        fontSize: "24px",
                        background:
                          "linear-gradient(to right, #e1306c, #fd1d1d, #fcb045, #833ab4)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    ></i>
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* การ์ดที่ 3 */}
          <MDBCol md="4" xl="3" className="mb-4">
            <MDBCard
              style={{
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                height: "500px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="hover-shadow-lg"
            >
              <MDBCardBody className="text-center d-flex flex-column justify-content-center align-items-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage
                    src="https://img2.pic.in.th/pic/S__24256519.jpg"
                    className="rounded-circle"
                    fluid
                    style={{
                      width: "200px",
                      height: "200px",
                      border: "2px solid #ddd",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
                <MDBTypography tag="h5" className="font-weight-bold text-dark">
                  Ms.Piyada Dasri
                </MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  @Admin <span className="mx-2">|</span>{" "}
                  <a href="/" className="text-primary">
                    comdiy.com
                  </a>
                </MDBCardText>
                <br />
                <br />
                <div className="mb-4 pb-2 d-flex justify-content-center">
                  <Link
                    to="https://www.facebook.com/piyada.dasri "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-facebook mx-2"
                      style={{ fontSize: "24px", color: "#3b5998" }}
                    ></i>
                  </Link>
                  <Link
                    to="https://line.me/ti/p/u4sdt3-N6S "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-line mx-2"
                      style={{ fontSize: "24px", color: "#00c300" }}
                    ></i>
                  </Link>
                  <Link
                    to="https://www.instagram.com/t.piyda?__pwa=1 "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-instagram mx-2"
                      style={{
                        fontSize: "24px",
                        background:
                          "linear-gradient(to right, #e1306c, #fd1d1d, #fcb045, #833ab4)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    ></i>
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* การ์ดที่ 4 */}
          <MDBCol md="4" xl="3" className="mb-4">
            <MDBCard
              style={{
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                height: "500px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="hover-shadow-lg"
            >
              <MDBCardBody className="text-center d-flex flex-column justify-content-center align-items-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage
                    src="https://img5.pic.in.th/file/secure-sv1/S__24330253.jpg"
                    className="rounded-circle"
                    fluid
                    style={{
                      width: "200px",
                      height: "200px",
                      border: "2px solid #ddd",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
                <MDBTypography tag="h5" className="font-weight-bold text-dark">
                  Mr.Siwakon Ratthayaphirak
                </MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  @Admin <span className="mx-2">|</span>{" "}
                  <a href="/" className="text-primary">
                    comdiy.com
                  </a>
                </MDBCardText>
                <br />
                <br />
                <div className="mb-4 pb-2 d-flex justify-content-center">
                  <Link
                    to="https://www.facebook.com/profile.php?id=100003162297952&mibextid=ZbWKwL "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-facebook mx-2"
                      style={{ fontSize: "24px", color: "#3b5998" }}
                    ></i>
                  </Link>
                  <Link
                    to="https://line.me/ti/p/BCssPH1G10 "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-line mx-2"
                      style={{ fontSize: "24px", color: "#00c300" }}
                    ></i>
                  </Link>
                  <Link
                    to="https://www.instagram.com "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-instagram mx-2"
                      style={{
                        fontSize: "24px",
                        background:
                          "linear-gradient(to right, #e1306c, #fd1d1d, #fcb045, #833ab4)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    ></i>
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ProfileStatistics;
