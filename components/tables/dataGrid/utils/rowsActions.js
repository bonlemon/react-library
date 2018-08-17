//эксперимент - нужен реакт версии 16.3
export function onGetSelectedRows() {
    const {selectedRows} = this.state;
    return [...selectedRows];
}