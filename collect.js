import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('https://evm-rpc.planq.network'))

let blockNum = 4322268

let run = async () => {
    let addresses = {}

    while (true) {
        let blck = blockNum++
        let block = await web3.eth.getBlock(blck)
        if (!block)
            break

        console.log('block', blck, 'transactions', block.transactions.length)
        for (let i = 0; i < block.transactions.length; i++) {
            let tx = await web3.eth.getTransaction(block.transactions[i])
            if (parseInt(tx.to) > 0) {
                addresses[tx.to] = true
            }
        }
    }

    let positiveAddresses = []
    for (addresses in addresses) {
        try {
            let balance = await web3.eth.getBalance(addresses)
            if (balance > 0) {
                positiveAddresses.push(addresses)
            }
        } catch (err) {
            console.log(err)
        }
    }
    console.log(positiveAddresses)
}

run()
