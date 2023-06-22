/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('dogs').del()
  await knex('dogs').insert([
    { id: 1, name: 'charlie', breed: 'dachshund' },
    { id: 2, name: 'tim', breed: 'poodle' },
    { id: 3, name: 'jack', breed: 'chihuahua' },
  ])
}
