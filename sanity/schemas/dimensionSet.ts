import {defineField, defineType} from 'sanity';

export const dimensionSet = defineType({
  name: 'dimensionSet',
  title: 'Conjunto de dimensões',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Rótulo (ex.: P, G, Home, Torre)', type: 'string' }),
    defineField({ name: 'height', title: 'Altura (cm)', type: 'number', validation: (Rule) => Rule.min(0) }),
    defineField({ name: 'width',  title: 'Largura (cm)', type: 'number', validation: (Rule) => Rule.min(0) }),
    defineField({ name: 'depth',  title: 'Profundidade (cm)', type: 'number', validation: (Rule) => Rule.min(0) }),
  ],
  preview: {
    select: {label: 'label', h: 'height', w: 'width', d: 'depth'},
    prepare({label, h, w, d}) {
      const title = label || 'Dimensões';
      const subtitle = [h && `A: ${h} cm`, w && `L: ${w} cm`, d && `P: ${d} cm`].filter(Boolean).join(' • ');
      return {title, subtitle};
    }
  }
});
