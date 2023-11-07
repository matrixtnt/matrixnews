import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title,desc,image }) => {
    return (
        <Helmet>
            <link rel="icon" href="../../../public/images/favicon.png" />
            <link rel="cononical" href="https://newsweb.wrteam.me/" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="News" content={title} />
            <meta name="robots" content="INDEX,FOLLOW" />
            <meta name="google-signin-client_id" content="1085975883181-n250edsvmqhh404t6hbimmqeakf0s5eu.apps.googleusercontent.com" />
            <link rel="apple-touch-icon" type="image/png" sizes="512x512" href="../../../public/images/favicon.png" />

            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta
                name="keywords"
                content="Breaking news,Top stories,Headlines,Current events,Latest news,World news,National news,Local news,Politics,Business,Technology,Entertainment,Sports,Health,Science,Environment,Education,Crime,Immigration,Weather."
            />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

            <meta property="og:url" content="https://newsweb.wrteam.me/" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="en_GB" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content={image} />    
            <meta name="twitter:image" content={image} />
            <meta property="twitter:site" content="website" />
        </Helmet>
    );
};

export default SEO;
