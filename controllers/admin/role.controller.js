const Role = require('../../models/role.model');

module.exports.index = async (req, res) => {
    try {
        let filter = { deleted: false };
        const records = await Role.find(filter);
        res.render('admin/pages/role/index', {
            records: records
        });
    } catch (error) {
        res.status(500).send('Error fetching roles');
    }
};

module.exports.create = async (req, res) => {
    res.render('admin/pages/role/create', {
        pageTitle: 'Tạo nhóm quyền'
    });
};

module.exports.createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).send('Tên phân quyền là bắt buộc.');
        }
        const record = new Role({ title, description });
        await record.save();
        res.redirect('/admin/role');
    } catch (error) {
        res.status(500).send('Error creating role');
    }
};

module.exports.edit = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Role.findById(id);
        res.render('admin/pages/role/edit', {
            record: record
        });
    } catch (error) {
        res.status(500).send('Error fetching role');
    }
}
module.exports.editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).send('Tên phân quyền là bắt buộc.');
        }
        await Role.findByIdAndUpdate(id, { title, description });
        res.redirect('/admin/role');
    } catch (error) {
        res.status(500).send('Error updating role');
    }
}
module.exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Role.findByIdAndUpdate(id, { deleted: true });
        res.redirect('/admin/role');
    } catch (error) {
        res.status(500).send('Error deleting role');
    }
}
module.exports.detail = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Role.findById(id);
        res.render('admin/pages/role/detail', {
            record: record
        });
    } catch (error) {
        res.status(500).send('Error fetching role');
    }
}
module.exports.permissions = async (req, res) => {
    let find = { deleted: false };
    let records = await Role.find(find);
    res.render('admin/pages/role/permissions', {
        pageTitle: 'Phân quyền',
        records: records
    });
}

