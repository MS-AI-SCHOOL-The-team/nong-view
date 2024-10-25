'use client';

import { useState, useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export function MDXContent({ content }) {
    const [mdxSource, setMdxSource] = useState(null);

    useEffect(() => {
        const prepareMDX = async () => {
            if (content) {
                const serialized = await serialize(content);
                setMdxSource(serialized);
            }
        };

        prepareMDX();
    }, [content]);

    if (!mdxSource) return null;

    return <MDXRemote {...mdxSource} />;
}