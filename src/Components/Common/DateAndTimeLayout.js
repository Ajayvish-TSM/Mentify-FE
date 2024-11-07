import moment from "moment";
import React, { useEffect, useState } from "react";
import AttendanceButton from "../../AttendanceButton";

export default function DateAndTimeLayout() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second (1000 milliseconds)
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // console.log("dateeeee", moment(dateTime).format("h:mm a"));

  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-flex align-items-center justify-content-end">
          <AttendanceButton />
          <h4 className="page-title mb-0 font-size-18 fw-normal text-end">
            <span className="fw-normal d-flex align-items-center">
              <svg width="16" height="16" viewBox="0 0 16 16" className="me-2">
                <path
                  id="Icon_material-watch-later"
                  data-name="Icon material-watch-later"
                  d="M11,3a8,8,0,1,0,8,8A8.024,8.024,0,0,0,11,3Zm3.36,11.36L10.2,11.8V7h1.2v4.16L15,13.32Z"
                  transform="translate(-3 -3)"
                  fill="rgba(255,255,255,0.6)"
                />
              </svg>
              {moment(dateTime).format("h:mm A")}
              <span className="mx-2">|</span>
              <svg
                width="14"
                height="16"
                viewBox="0 0 16 18.286"
                className="me-2"
              >
                <path
                  id="Icon_awesome-calendar-alt"
                  data-name="Icon awesome-calendar-alt"
                  d="M0,16.571a1.715,1.715,0,0,0,1.714,1.714H14.286A1.715,1.715,0,0,0,16,16.571V6.857H0Zm11.429-7a.43.43,0,0,1,.429-.429h1.429a.43.43,0,0,1,.429.429V11a.43.43,0,0,1-.429.429H11.857A.43.43,0,0,1,11.429,11Zm0,4.571a.43.43,0,0,1,.429-.429h1.429a.43.43,0,0,1,.429.429v1.429a.43.43,0,0,1-.429.429H11.857a.43.43,0,0,1-.429-.429ZM6.857,9.571a.43.43,0,0,1,.429-.429H8.714a.43.43,0,0,1,.429.429V11a.43.43,0,0,1-.429.429H7.286A.43.43,0,0,1,6.857,11Zm0,4.571a.43.43,0,0,1,.429-.429H8.714a.43.43,0,0,1,.429.429v1.429A.43.43,0,0,1,8.714,16H7.286a.43.43,0,0,1-.429-.429ZM2.286,9.571a.43.43,0,0,1,.429-.429H4.143a.43.43,0,0,1,.429.429V11a.43.43,0,0,1-.429.429H2.714A.43.43,0,0,1,2.286,11Zm0,4.571a.43.43,0,0,1,.429-.429H4.143a.43.43,0,0,1,.429.429v1.429A.43.43,0,0,1,4.143,16H2.714a.43.43,0,0,1-.429-.429Zm12-11.857H12.571V.571A.573.573,0,0,0,12,0H10.857a.573.573,0,0,0-.571.571V2.286H5.714V.571A.573.573,0,0,0,5.143,0H4a.573.573,0,0,0-.571.571V2.286H1.714A1.715,1.715,0,0,0,0,4V5.714H16V4A1.715,1.715,0,0,0,14.286,2.286Z"
                  fill="rgba(255,255,255,0.6)"
                />
              </svg>
              <span>{moment(dateTime).format("DD-MM-YYYY")}</span>
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}
