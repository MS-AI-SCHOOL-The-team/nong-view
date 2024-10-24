'use client';

import { useState, useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export function MDXContent({ content }) {
    const [mdxSource, setMdxSource] = useState(null);

    useEffect(() => {
        if (!content) return;

        // 마크다운 형식이 아닌 경우 early return
        if (!content.includes('#') && !content.includes('*') && !content.includes('```')) {
            return;
        }

        serialize(content)
            .then(source => setMdxSource(source))
            .catch(err => {
                console.error('MDX 변환 실패:', err);
            });
    }, [content]);

    // MDX 변환에 실패하거나 일반 텍스트인 경우
    if (!mdxSource) {
        return <p>{content}</p>;
    }

    return <MDXRemote {...mdxSource} />;
}