import {parseString} from 'xml2js';

export const parseXML = (xml: string) => {
  let data;

  parseString(xml, function (err, result) {
    data = result;
  });

  return data;
};
