import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {PLANET_LINK} from "@/constant";
const Footer: React.FC = () => {
  const defaultMessage = '一根鱼出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'plant',
          title: '一根鱼星球',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'codeNav',
          title: 'howlong导航',
          href: PLANET_LINK,
          blankTarget: true,
        },
        {
          key: 'github',
          title:<><GithubOutlined /> 一根鱼 GitHub</> ,
          href: 'https://github.com/yehowlong',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
