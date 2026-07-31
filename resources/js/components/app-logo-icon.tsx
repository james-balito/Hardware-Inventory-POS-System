import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <>
            <img src="/logoicon.png" alt="MacMac Hardware" className = {`bg-white`} />
        </>
    );
}
