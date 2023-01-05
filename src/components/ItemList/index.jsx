import "./styles.css"

export function ItemList({title, description}) {
  return (
    <div className="item_list">
      <strong>{title}</strong>
      <p>{description}</p>
      <hr />
    </div>
  )
}
