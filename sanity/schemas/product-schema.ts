import {defineField, defineType} from 'sanity';

export const product = defineType({
  name: 'product',
  title:'Produtos',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: {source:'name'}, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [{ name: 'alt', title: 'Texto alternativo (ALT)', type: 'string' }]
      }],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos uma imagem.'),
    }),
    defineField({
      name: 'price',
      title: 'Preço (R$ — sem centavos)',
      type: 'number',
      description: 'Use apenas números inteiros. Ex.: 1409',
      validation: (Rule) => Rule.required().min(0).custom((v) => Number.isInteger(v) ? true : 'Use inteiro, sem centavos.'),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          {title: 'Sala de estar',  value: 'sala_de_estar'},
          {title: 'Sala de jantar', value: 'sala_de_jantar'},
          {title: 'Quarto',         value: 'quarto'},
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'colors', title: 'Cores (insira uma cor por vez e dê enter)', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'} }),
    defineField({
      name: 'features',
      title: 'Informações (insira uma informação por vez e dê enter)',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    // AQUI usa o tipo registrado 'dimensionSet'
    defineField({
      name: 'dimensions',
      title: 'Dimensões',
      type: 'array',
      of: [{ type: 'dimensionSet' }],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos um conjunto de dimensões.'),
      description: 'Use um item por variação (ex.: Único/P/G) ou por módulo (ex.: Home/Torre).',
    }),
    defineField({
      name: 'extraSections',
      title: 'Seções adicionais',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Título da seção', type: 'string' },
          { name: 'content', title: 'Conteúdo', type: 'array', of: [{ type: 'block' }, { type: 'image', options: {hotspot: true} }] }
        ],
        preview: { select: {title: 'title'}, prepare: ({title}) => ({title: title || 'Seção'}) }
      }]
    }),
    defineField({ name: 'sku', title: 'SKU (opcional)', type: 'string' }),
    defineField({ name: 'shortDescription', title: 'Descrição curta', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'name', media: 'images.0', price: 'price', category: 'category' },
    prepare({title, media, price, category}) {
      const catMap: Record<string,string> = {
        'sala_de_estar': 'Sala de estar',
        'sala_de_jantar': 'Sala de jantar',
        'quarto': 'Quarto'
      };
      const priceBRL = typeof price === 'number' ? `R$ ${price.toLocaleString('pt-BR')}` : '';
      const subtitle = [catMap[category], priceBRL].filter(Boolean).join(' • ');
      return {title, media, subtitle};
    }
  }
});
