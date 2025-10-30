import { type SchemaTypeDefinition } from 'sanity'
import { product } from '../schemas/product-schema'
import { dimensionSet } from '../schemas/dimensionSet'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, dimensionSet],
}
