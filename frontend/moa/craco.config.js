module.exports = {
    webpack: {
      configure: {
        module: {
              rules: [
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                  },
            {
              test: /\.m?js/,
              type: "javascript/auto",
            },
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
      },
    },
  };